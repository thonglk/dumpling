/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix', 'ngCordova'])

  .config(function ($ionicCloudProvider) {
    $ionicCloudProvider.init({
      "core": {
        "app_id": "BA73892C"
      }
    });
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      $cordovaPlugin.someFunction().then(success, error);


      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        //StatusBar.styleDefault();
        StatusBar.styleLightContent();
      }

    });

  })
  .run(function ($rootScope, $ionicDeploy, $ionicLoading, $ionicPopup, $timeout) {

    $ionicDeploy.check().then(function (snapshotAvailable) {

      if (snapshotAvailable) {
        $ionicLoading.show({
          template: '<p>Ứng dụng đang tải bản cập nhật mới nhất, vui lòng đợi...!</p><ion-spinner></ion-spinner>'
        });
        $ionicDeploy.download().then(function () {
          $ionicDeploy.extract().then(function (process) {
            console.log("Process", process);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Đã cập nhật phiên bản mới',
              template: '<p style="text-align: center">Nhấn ok để làm mới</p>'
            });
            alertPopup.then(function (res) {
              $ionicDeploy.load();
            });
          });
        });

      }
    });
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });

    var ftuk22016Ref = firebase.database().ref('ftuk22016');
    ftuk22016Ref.once('value', function (snap) {
      $rootScope.data = snap.val();
      console.log('done')
    })
    $ionicLoading.hide();

  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {

    $ionicFilterBarConfigProvider.theme('light');
    $ionicFilterBarConfigProvider.clear('ion-close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(true);
    $ionicFilterBarConfigProvider.transition('vertical');
    $ionicFilterBarConfigProvider.placeholder('Search...');

    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');


    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.agenda', {
        url: '/agenda',
        views: {
          'tab-agenda': {
            templateUrl: 'templates/tab-agenda.html',
            controller: 'AgendaController'
          }
        }
      })
      .state('tab.fotos', {
        url: '/fotos',
        views: {
          'tab-fotos': {
            templateUrl: 'templates/tab-fotos.html',
            controller: 'FotosController'
          }
        }
      })
      .state('tab.fotos-detail', {
        url: '/fotos/:fotosId',
        views: {
          'tab-fotos': {
            templateUrl: 'templates/fotos-detail.html',
            controller: 'AlbunesController'
          }
        }
      })
      .state('tab.favoritos', {
        url: '/favoritos',
        views: {
          'tab-favoritos': {
            templateUrl: 'templates/tab-love.html',
            controller: 'FavoritosController'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AjustesController'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/agenda');

  });
