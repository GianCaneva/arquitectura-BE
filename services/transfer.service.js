const sequelize = require("../db");
const { models } = require("../db");
const BusinessError = require("../errors/business_error");
const AccountService = require("../services/account.service");
const MovementService = require("../services/movement.service");
const MovementTypeService = require("../services/movement_type.service");
const PartnerQueue = require("../queues/partner.queue");

exports.transfer = async function (req, movType, user) {
  try {
    const result = await sequelize.transaction(async (t) => {
      let debitAccount;
      if (user) {
        debitAccount = user.account;
        debitAccount.user = user;
      } else
        debitAccount = await getAccount(req.debitUser);

      let creditAccount = await getAccount(req.creditUser);
      let movementType = await MovementTypeService.get(movType);

      // if (debitAccount.balance - req.amount < 0)
      //   throw new BusinessError(
      //     "Saldo insuficiente.",
      //     `docTypeId: ${debitAccount.user.docTypeId}, docNumber: ${debitAccount.user.docNumber}.`
      //   );

      await AccountService.updateBalance(-req.amount, debitAccount.id, t);
      await AccountService.updateBalance(req.amount, creditAccount.id, t);

      await creditAccount.update(
        {
          balance: +creditAccount.balance + req.amount,
        },
        { transaction: t }
      );

      let movementDebit = MovementService.insert(
        {
          accountId: debitAccount.id,
          amount: -req.amount,
          movementTypeId: movementType.id,
          description: `${movementType.descriptionDebit}${req.description ? ` - ${req.description}` : ""}`,
          billNumber: req.billNumber,
          usernameDebit: debitAccount.user.name,
          usernameCredit: creditAccount.user.name,
        },
        t
      );

      MovementService.insert(
        {
          accountId: creditAccount.id,
          amount: req.amount,
          movementTypeId: movementType.id,
          description: movementType.descriptionCredit,
          billNumber: req.billNumber,
          usernameDebit: creditAccount.user.name,
          usernameCredit: debitAccount.user.name,
        },
        t
      );

      PartnerQueue.postTransfer({
        debitAccount,
        creditAccount,
        req,
        movType
      })

      return movementDebit;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

async function getAccount(user) {
  let account = await AccountService.getUserAccount(user);
  if (!account)
    throw new BusinessError(
      "Usuario o cuenta inexistente.",
      `docTypeId: ${user.docTypeId}, docNumber: ${user.docNumber}.`
    );
  return account;
}
