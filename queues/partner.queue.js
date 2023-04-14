exports.postTransfer = async function (data) {
  publish({
    tipo: 'transferencia',
    debitUser: getUserData(data.debitAccount),
    creditUser: getUserData(data.creditAccount),
    amount: data.req.amount,
    billNumber: data.req.billNumber,
    reason: data.movType,
    description: data.req.description
  });
};

exports.postError = async function (data, error) {
  publish({
    error,
    ...data
  });
};

function publish(body) {
  console.log(new Date() + ' Mensaje publicado: ' + JSON.stringify(body));
  var requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
    redirect: "follow",
  };

  fetch("http://core.deliver.ar/publicarMensaje?canal=partners", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => {
      throw new BusinessError(
        "Error al publicar mensaje",
        error
      );
    });
}

function getUserData(account) {
  return {
    docType: account.user.docTypeId,
    docNumber: account.user.docNumber,
    cbu: account.cbu
  }
}
