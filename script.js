const firebaseConfig = {
  apiKey: "AIzaSyBhLC6Qg3V0GZkoz5vp_PvI38GoZj0hwNc",
  authDomain: "iejeehhe-baae0.firebaseapp.com",
  databaseURL: "https://iejeehhe-baae0-default-rtdb.firebaseio.com",
  projectId: "iejeehhe-baae0",
  storageBucket: "iejeehhe-baae0.firebasestorage.app",
  messagingSenderId: "171801618860",
  appId: "1:171801618860:web:343c797850f4903cd87209",
  measurementId: "G-921S29WC57"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
firebase.auth().signInAnonymously();

const statusEl = document.getElementById("status");
const remoteAudio = document.getElementById("remoteAudio");
const tuneBtn = document.getElementById("tune");
const talkBtn = document.getElementById("talk");
const freqInput = document.getElementById("freqInput");
const freqDisplay = document.getElementById("freqDisplay");

let pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});
let localStream;

pc.ontrack = (event) => {
  remoteAudio.srcObject = event.streams[0];
};

async function getMediaAndAddTracks() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
}

tuneBtn.onclick = async () => {
  const freq = freqInput.value.trim().replace(/\s+/g, '').replace('.', '-');
  if (!freq) {
    alert("Please enter a frequency!");
    return;
  }

  freqDisplay.innerText = freqInput.value.trim();
  const roomId = `freq-${freq}`;
  const roomRef = db.ref(`rooms/${roomId}`);

  statusEl.innerText = "Tuning...";
  await getMediaAndAddTracks();

  const offerSnap = await roomRef.child("offer").get();
  if (offerSnap.exists()) {
    const offer = JSON.parse(offerSnap.val());
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await roomRef.child("answer").set(JSON.stringify(answer));
    statusEl.innerText = `Connected on ${freq} MHz`;
  } else {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await roomRef.child("offer").set(JSON.stringify(offer));
    statusEl.innerText = `Broadcasting on ${freq} MHz`;

    roomRef.child("answer").on('value', async (snapshot) => {
      const answer = snapshot.val();
      if (answer && !pc.currentRemoteDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
        statusEl.innerText = `Connected on ${freq} MHz`;
      }
    });
  }

  roomRef.child("candidates").on('child_added', async (snapshot) => {
    const candidate = new RTCIceCandidate(JSON.parse(snapshot.val()));
    await pc.addIceCandidate(candidate);
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child("candidates").push(JSON.stringify(event.candidate));
    }
  };
};

talkBtn.onmousedown = async () => {
  if (!localStream) return;
  localStream.getAudioTracks().forEach(track => track.enabled = true);
};
talkBtn.onmouseup = () => {
  if (!localStream) return;
  localStream.getAudioTracks().forEach(track => track.enabled = false);
};