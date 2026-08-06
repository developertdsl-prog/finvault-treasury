const Iso20022Parser = require('../services/iso20022Parser');

describe('Iso20022Parser Financial XML Engine Test Suite', () => {
  test('Generates valid ISO 20022 pain.001 credit transfer XML structure', () => {
    const transferDetails = {
      reference: 'TX-INT-8831',
      debtorName: 'FinVault HQ',
      debtorIban: 'US33CHAS00010019980001',
      creditorName: 'FinVault Europe GmbH',
      creditorIban: 'DE89DBXX00020024410002',
      amount: 2500000,
      currency: 'EUR'
    };

    const xml = Iso20022Parser.generatePain001Xml(transferDetails);
    expect(xml).toContain('pain.001.001.09');
    expect(xml).toContain('<InstdAmt Ccy="EUR">2500000.00</InstdAmt>');
    expect(xml).toContain('<IBAN>DE89DBXX00020024410002</IBAN>');
  });
});
