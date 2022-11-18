window.ready(function () {
  let yearArray = [];
  let archive_items = document.querySelectorAll('.archives-item');
  forEach(archive_items, (idx, ele) => {
    let archivesYear = ele.getAttribute("date");
    yearArray.push(archivesYear);
  });

  let uniqueYear = [...new Set(yearArray)];
  let archive_content = document.querySelector('.archives-content');
  for (let i = 0; i < uniqueYear.length; i++) {
    let archive_year = document.createElement('div');
    archive_year.classList = 'archives-item';
    archive_year.innerHTML = "<div class='archives-year'>" + "<h3><time datetime='" + uniqueYear[i] + "'>" + uniqueYear[i] + "</time></h3>" + "</div>";
    let first_year = document.querySelector('div[date="' + uniqueYear[i] + '"]');
    archive_content.insertBefore(archive_year, first_year);
  }
});
