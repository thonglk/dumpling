angular.module('starter.controllers', [])

  .controller('AgendaController', function ($scope, $ionicPopup, $rootScope, $ionicLoading) {
    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />'
    firebase.auth().onAuthStateChanged(function (user) {


      if (user) {
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $rootScope.uid = user.uid;
        var tokenRef = firebase.database().ref("token/" + $scope.userid);
        tokenRef.on('value', function (snap) {
          $scope.currenttoken = snap.val();
          if (!$scope.currenttoken || $scope.currenttoken.tokenId != $rootScope.tokenuser) {
            $scope.currenttoken = $rootScope.tokenuser;
            tokenRef.update({
                userid: $scope.userid,
                tokenId: $rootScope.tokenuser
              }
            )
          }
        });

        console.log("Login", $rootScope.uid)
        var userRef = firebase.database().ref('user/' + $rootScope.uid);
        userRef.on('value', function (snap) {
          $rootScope.userdata = snap.val();
          console.log($rootScope.userdata);
          if ($rootScope.userdata && $rootScope.userdata.ca) {
            $scope.datathu2 = [];
            $scope.datathu3 = [];
            $scope.datathu4 = [];
            $scope.datathu5 = [];
            $scope.datathu6 = [];
            $scope.datathu7 = [];
            $scope.datathu8 = [];

            angular.forEach($rootScope.userdata.ca, function (card) {
              if (card.thu == "2") {
                $scope.datathu2.push(card)
              }
              if (card.thu == "3") {
                $scope.datathu3.push(card)
              }
              if (card.thu == "4") {
                $scope.datathu4.push(card)
              }
              if (card.thu == "5") {
                $scope.datathu5.push(card)
              }
              if (card.thu == "6") {
                $scope.datathu6.push(card)
              }
              if (card.thu == "7") {
                $scope.datathu7.push(card)
              }
              if (card.thu == "8") {
                $scope.datathu8.push(card)
              }

            });
            console.log("DON", $scope.datathu2);
          }
          $ionicLoading.hide()

        });

      } else {
        // No user is signed in.
        firebase.auth().signInAnonymously().catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            $rootScope.uid = user.uid;
            // ...
          } else {
            // User is signed out.
            // ...
          }
          // ...
        });
        console.log("Anany", $rootScope.uid)
        $ionicLoading.hide()

      }
    });


  })

  .controller('FotosController', function ($scope, Locales, $ionicFilterBar, $rootScope, $cordovaToast, $ionicLoading) {



    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.limit = 10;
    $scope.doRefresh = function () {
      console.log("working")
      if ($rootScope.data) {
        $scope.limit = $scope.limit + 10;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');

    };
    $scope.$on('$stateChangeSuccess', function () {
      $scope.doRefresh();
    });
    $scope.locales = Locales.all();
    $scope.remove = function (local) {
      Locales.remove(local);
    };

    $scope.favorito = function (local) {
      // xu ly ngay
      var datearray = local.tiendomonhoc.split("-");
      var datestartstr = datearray[0].split("/"); //tach ngay
      var datestart = new Date(2017, datestartstr[1], datestartstr[0]);

      var datestartstr2 = datearray[1].split("/"); //tach ngay
      var dateend = new Date(2017, datestartstr2[1], datestartstr2[0]);

      //end xu ly ngay

      //xu ly ca

      var thu = local.lichhoc.charAt(0);

      var castr = local.lichhoc.slice(2, 4);
      var ca = 0;
      if (castr == 01) {
        ca = 1
      }
      if (castr == 04) {
        ca = 2
      }
      if (castr == 07) {
        ca = 3
      }
      if (castr == 10) {
        ca = 4
      }
      // end xu ly ngay

      $scope.cadangky = {
        stt: local.stt,
        tenhocphan: local.tenhocphan,
        maloptinchi: local.maloptinchi,
        datestart: datestart,
        dateend: dateend,
        thu: thu,
        ca: ca
      }

      var caRef = firebase.database().ref().child('user/' + $rootScope.uid + "/ca/" + local.stt);
      caRef.update($scope.cadangky)
      $cordovaToast.showShortTop("Đã thêm ca " + local.tenhocphan)
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $rootScope.data,
        update: function (filteredItems, filterText) {
          $rootScope.data = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

  })

  .controller('AlbunesController', function ($scope, $stateParams, $rootScope) {
    var local_id = $stateParams.fotosId - 1;
    console.log(local_id)
    $scope.hocphandata = $rootScope.data[local_id]
    console.log($scope.hocphandata)

  })

  .controller('FavoritosController', function ($scope, $rootScope) {
    $scope.removeca = function (index) {
      console.log("de", index);
      var deletejobRef = firebase.database().ref('user/' + $rootScope.uid + '/ca/' + index);
      deletejobRef.remove()
    }
  })

  .controller('AjustesController', function ($scope, $cordovaInAppBrowser) {

    $scope.settings = {
      enviarNotificaciones: true
    };
    $scope.gotoprofile = function () {
      $cordovaInAppBrowser.open('http://facebook.com/khanhthongg', '_blank')
        .then(function (event) {
          // success
        })
        .catch(function (event) {
          // error
        });
    }
  });
