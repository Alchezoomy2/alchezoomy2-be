// helper function that will take in the /seed_meetings endpoint obj.body and returns an array of keys matching the filter conditions (works for recording_start and recording_end)
module.exports = function (obj, desiredKey) {
  let arr = [];
  obj.meetings.forEach((child) =>
    child.recording_files.filter((key) => {
      if (key.recording_type === "audio_transcript") {
        return arr.push(key[desiredKey]);
      }
    })
  );
  return arr;
};
