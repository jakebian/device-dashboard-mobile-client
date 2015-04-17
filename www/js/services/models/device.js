var API_URL = 'http://104.236.234.157:1337';

angular.module('app.services.models.device', [])

.service('Device', [
             '$http',
    function ($http) {

        return {
            create: create,
            getAll: getAll,
            update: update,
            remove: remove,
            getByNfcID: getByNfcID
        }

        function create(device) {
            return $http.post(getUrl('/device'), device)
        }

        function getAll() {
            return $http.get(getUrl('/device'));
        }

        function update(device) {
            return $http.post(getUrl('/device/' + device.id), device);
        }

        function remove(device) {
            return $http.delete(getUrl('/device/' + device.id));
        }

        function getByNfcID(nfcId) {
            return $http.get(getUrl('/device/?nfcID=' + nfcId));
        }

        function getUrl(path) {
            return API_URL + path;
        }
    }
])
