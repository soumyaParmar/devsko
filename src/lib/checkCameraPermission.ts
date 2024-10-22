export async function checkCameraPermission() {
    return await navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // Camera access is already granted.
        // console.log('Camera permission is granted.');
        // Stop the stream immediately since we are just checking.
        stream.getTracks().forEach(track => track.stop());
        return true;
      })
      .catch(function(err) {
        // if (err.name === 'NotAllowedError') {
        //   // Camera permission is denied.
        // //   console.log('Camera permission is denied.');
        // } else if (err.name === 'NotFoundError') {
        //   // No camera device found
        // //   console.log('No camera device found.');
        // } else {
        //   // Other error
        // //   console.log('Error checking camera permission: ', err);
        // }
        console.log(err);
        return false;  // Permission denied or error
      });
  }