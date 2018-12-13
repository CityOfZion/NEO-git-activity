export function filterArray(aryData,sortBy,sortDir,limit) {
        
    var rows = aryData;

    rows.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
   
      if (sortDir === 'DESC') {
        sortVal = sortVal * -1; 
      }
      return sortVal;
    });
    if (rows.length < limit)
        return rows
    else 
        return rows.slice(0, limit)
}