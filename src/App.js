import { useState } from "react";
import CandidateInfo from "./Components/Form";
import { Box, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const [isResumeReady, setIsResumeReady] = useState(false);
  const handleSubmit = () => {
    setIsResumeReady(true);
  };
  const handleDownload = () => {
    const input = document.getElementById("resume-content");
    html2canvas(input, { useCORS: true, scale: 3 }).then((canvas) => {
      // Create a new PDF canvas.
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "pt", "a4");
      // then we get the dimensions from the 'pdf' file itself
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProps.height * width) / imgProps.width;
      // convert your PDF and save to file
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`resume.pdf`); // Download the rendered PDF.
    });
  };
  return (
    <>
      <CandidateInfo isResumeReady={isResumeReady} />
      {!isResumeReady && (
        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: "40px", marginTop: "20px", display: "block" }}
          onClick={handleSubmit}
        >
          Save & Preview
        </Button>
      )}
      {isResumeReady && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setIsResumeReady(false)}
          >
            {" "}
            Edit Resume
          </Button>
          <Button variant="contained" color="success" onClick={handleDownload}>
            {" "}
            Download Resume
          </Button>
        </Box>
      )}
    </>
  );
}

export default App;
