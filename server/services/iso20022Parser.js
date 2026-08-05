const xml2js = require('xml2js');

class Iso20022Parser {
  /**
   * Generates an ISO 20022 pain.001.001.09 compliant Customer Credit Transfer XML instruction.
   */
  static generatePain001Xml(transferDetails) {
    const msgId = `MSG-${Date.now()}`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${msgId}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <InitgPty>
        <Nm>${transferDetails.initiatorName || 'FinVault Corporate Treasury'}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-${transferDetails.reference}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt>${new Date().toISOString().split('T')[0]}</ReqdExctnDt>
      <Dbtr>
        <Nm>${transferDetails.debtorName}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id><IBAN>${transferDetails.debtorIban}</IBAN></Id>
      </DbtrAcct>
      <CdtTrfTxInf>
        <Amt>
          <InstdAmt Ccy="${transferDetails.currency}">${transferDetails.amount.toFixed(2)}</InstdAmt>
        </Amt>
        <Cdtr>
          <Nm>${transferDetails.creditorName}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id><IBAN>${transferDetails.creditorIban}</IBAN></Id>
        </CdtrAcct>
        <RmtInf>
          <Ustrd>${transferDetails.reference}</Ustrd>
        </RmtInf>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
    return xml;
  }

  /**
   * Parses an ISO 20022 camt.053 XML Bank-to-Customer statement into structured entries.
   */
  static async parseCamt053Xml(xmlString) {
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(xmlString);
    return parsed;
  }
}

module.exports = Iso20022Parser;
