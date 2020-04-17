module.exports = (table, view, filter) => {
  let records = [];

  return new Promise((resolve, reject) => {
    if (records.length > 0) {
      resolve(records);
    };

    const processPage = (partialRecords, fetchNextpage) => {
      records = [...records, ...partialRecords];
      fetchNextpage();
    };

    const processRecords = (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(records);
    };

    table.select({ view, filterByFormula: filter ? filter : '' }).eachPage(processPage, processRecords);
  });
};
