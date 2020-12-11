module.exports = (itemsOrdered, totalPrice) => {
  return `
  # Thank you for your purchase!

  We're happy to inform you that your transaction in the amount of CHF ${totalPrice} was completed successfully.
  
  You'll receive the following items within the next two weeks:
  
  **${itemsOrdered}**
  
  If you happen to have any questions, please contact us at [info@voltagearc.com](mailto:info@voltagearc.com).
  
  Rockin' greez,
  Voltage Arc
  `;
};
