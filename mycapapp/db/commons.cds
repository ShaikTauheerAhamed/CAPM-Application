namespace anubhav.common;
using { Currency } from '@sap/cds/common';

//The enum keyword in programming languages allows you to define a set of 
//named constants that represent discrete values. In the provided code snippet.
type Gender : String(1) enum{
    male = 'M';
    female = 'F';
    undisclosed = 'U';
};

//the "@" symbol followed by annotations (@( ... )) is used to attach metadata or
// additional information to a type or a field. Let's break down its purpose and 
//significance in the context of AmountT.
type AmountT : Decimal(10,2)@(
    Semantics.amount.currencyCode: 'CURRENCY_CODE',
    sap.unit:'CURRENCY_CODE'
);

aspect Amount: {
    CURRENCY: Currency;
    GROSS_AMOUNT: AmountT @(title : '{i18n>GrossAmount}');
    NET_AMOUNT: AmountT @(title : '{i18n>NetAmount}');
    TAX_AMOUNT: AmountT @(title : '{i18n>TaxAmount}');
}


type Guid: String(32);
type PhoneNumber: String(30)@assert.format : '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$';
type Email: String(255)@assert.format : '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';