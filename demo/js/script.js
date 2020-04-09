$(document).ready(function() {
  run()
})
    
    let forwardTimes = []

    function updateTimeStats(timeInMs) {
      forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
      const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
      $('#time').val(`${Math.round(avgTimeInMs)} ms`)
      $('#fps').val(`${faceapi.utils.round(1000 / avgTimeInMs)}`)
    }

    async function onPlay() {
      const videoEl = $('#inputVideo').get(0)

      if(videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
        return setTimeout(() => onPlay())


      const options = getFaceDetectorOptions()

      const ts = Date.now()
      const mtcnnForwardParams = {
        maxNumScales: 10,
        scaleFactor: 0.709,
        scoreThresholds: [0.6, 0.7, 0.7],
        minFaceSize: 20
      }
      const mtcnnResults = await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams)

// const mtcnnResults = await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams)

      updateTimeStats(Date.now() - ts)

      if (mtcnnResults) {
        const canvas = $('#overlay').get(0)
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        faceapi.draw.drawDetections(canvas,mtcnnResults.map(res => res.faceDetection), { withScore: false })
      }

      setTimeout(() => onPlay())
    }



async function run() {
  // load the models
  await faceapi.loadMtcnnModel('/')
  await faceapi.loadFaceRecognitionModel('/')
  
  // try to access users webcam and stream the images
  // to the video element
  const videoEl = document.getElementById('inputVideo')
  navigator.getUserMedia(
    { video: {} },
    stream => videoEl.srcObject = stream,
    err => console.error(err)
  )
  const mtcnnForwardParams = {
  // number of scaled versions of the input image passed through the CNN
  // of the first stage, lower numbers will result in lower inference time,
  // but will also be less accurate
  maxNumScales: 10,
  // scale factor used to calculate the scale steps of the image
  // pyramid used in stage 1
  scaleFactor: 0.709,
  // the score threshold values used to filter the bounding
  // boxes of stage 1, 2 and 3
  scoreThresholds: [0.6, 0.7, 0.7],
  // mininum face size to expect, the higher the faster processing will be,
  // but smaller faces won't be detected
  minFaceSize: 20
}

// const mtcnnResults = await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams)
// faceapi.draw.drawDetections('overlay', mtcnnResults.map(res => res.faceDetection), { withScore: false })
// faceapi.draw.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), { lineWidth: 4, color: 'red' })
// }