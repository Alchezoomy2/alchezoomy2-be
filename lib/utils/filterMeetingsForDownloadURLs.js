// helper function that will take in the /meetings endpoint obj.body and returns an array of download_urls matching the filter conditions
module.exports = function (obj) {
  let arr = [];
  obj.meetings.forEach((child) =>
    child.recording_files.filter((key) => {
      if (key.recording_type === "audio_transcript") {
        return arr.push(key.download_url);
      }
    })
  );
  return arr;
};
