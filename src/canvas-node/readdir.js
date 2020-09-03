var fs = require('fs');

$scope.explorer = [];
$scope.openFile = function () {
  $scope.explorer = [tree_entry($scope.path)];
  get_folder($scope.path, $scope.explorer[0].children);
};

function get_folder(path, tree) {
  fs.readdir(path, function (err, files) {
    if (err) return console.log(err);

    files.forEach(function (file, idx) {
      tree.push(tree_entry(file));
      fs.lstat(path + '/' + file, function (err, stats) {
        if (err) return console.log(err);
        if (stats.isDirectory()) {
          get_folder(path + '/' + file, tree[idx].children);
        }
      });
    });
  });
  console.log($scope.explorer);

  return;
}

function tree_entry(entry) {
  return { label: entry, children: [] };
}
