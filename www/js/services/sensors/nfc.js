angular.module('app.services.sensors.nfc', [])

.factory('NFC', [
             '$q', '$ionicPlatform',
    function ($q ,  $ionicPlatform) {

        return {
            addNdefListener: addNdefListener,
            addNdefListenerWhenReady: addNdefListenerWhenReady
        }

        function addNdefListenerWhenReady(callback) {
            return $ionicPlatform.ready(addNdefListenerIfExists);

            function addNdefListenerIfExists() {

                if (!window.nfc) {
                    throw new Error('Your device cannot read NFC');
                }

                addNdefListener(callback);

            };
        }



        function addNdefListener(callback) {

            var q = $q.defer();
            nfc.addNdefListener( callback || angular.noop, resolve, reject);

            return q.promise;

            function resolve() {
                q.resolve();
            }

            function reject(err) {
                q.reject(err);
            }
        }

    }
]);


