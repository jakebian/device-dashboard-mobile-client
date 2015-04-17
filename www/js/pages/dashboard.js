angular.module('app.pages.dashboard', [
    'app.services',
    'app.constants'
])

.controller('DashCtrl', [
            '$scope', 'NFC', 'statusOptions', 'Device',
    function($scope ,  NFC ,  statusOptions ,  Device) {
        var lastDeviceId;
        $scope.statusOptions = statusOptions;

        $scope.model = {
            waiting: false,
            state: 'WELCOME'  // WELCOME | ADD
        }

        $scope.newDevice = {};

        startNFCSearch();

        $scope.addDevice = addDevice;
        $scope.updateDevice = updateDevice;


        function addDevice() {
            Device.create($scope.newDevice)
                .then(function (response) { console.log('yay!'); })
                .catch(function (err) { console.log(err); })
            $scope.model.state = 'WELCOME';
        }

        function updateDevice() {
            Device.update($scope.editingDevice)
                .then(function (response) { console.log('yay!'); })
                .catch(function (err) { console.log(err); });
            $scope.model.state = 'WELCOME';
        }

        function startNFCSearch() {
            NFC.addNdefListenerWhenReady(nfcEvtCallback)
                .then(startWaiting)
                .catch(logNFCError);
        }

        function nfcEvtCallback(nfcEvt) {
            stopWaiting();

            lastDeviceId = getFormattedTagId(nfcEvt.tag.id);

            console.log('detected NFC tag ' + lastDeviceId);

            Device.getByNfcID(lastDeviceId)
                .then(handleDevicesResponse)
                .catch(function (err) { console.log(JSON.stringify(err)); })
        }

        function handleDevicesResponse(response) {

            if (!response.data.length) {
                startAddingNewDevice();
                return;
            }

            startEditingDevice(response.data[0]);

        }

        function startEditingDevice(device) {

            $scope.model.state = 'EDIT';
            $scope.editingDevice = angular.copy(device);
            $scope.$digest();

        }

        function startAddingNewDevice() {

            $scope.model.state = 'ADD';
            $scope.newDevice.nfcID = lastDeviceId;
            $scope.$digest();

        }

        function logNFCError(err) {
            stopWaiting();
            alert('NFC Error');
        }

        function startWaiting() {
            $scope.model.waiting = true;
        }

        function stopWaiting() {
            $scope.model.waiting = false;
        }

    }
]);

function getFormattedTagId(tagId) {
    return tagId.join('_');
}

