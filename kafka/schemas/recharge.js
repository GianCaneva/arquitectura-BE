const { findSchemaBySubjectAndVersion, sendMessageToTopic, readMessageFromTopic } = require('../kafka')

const topic = 'recharge'
const version = 1
const subject = 'recharge-value'

const writeUserDataToKafka = async (payload, key) => {
  try {
    const encodePayloadId = await findSchemaBySubjectAndVersion({ version, subject })

    console.log(`Topic: ${topic}; subject: ${subject}; id: ${encodePayloadId}`)

    await sendMessageToTopic({ payload, topic, encodePayloadId, key})

  } catch (err) {
    console.error(err)
  }
}

const readMessages = () => {
  readMessageFromTopic(topic, (data) => {
    console.log("\n----------------------------------------\n");
    console.log(data, 'data desde kafka');
    console.log("\n----------------------------------------\n");
  })
}

module.exports.writeUserDataToKafka = writeUserDataToKafka
module.exports.readMessages = readMessages
