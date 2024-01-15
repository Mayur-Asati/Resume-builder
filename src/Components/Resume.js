import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../index.css";
import profileIcon from "../assets/profile.svg";
import educationIcon from "../assets/education.svg";
import experienceIcon from "../assets/quality.png";
import declaration from "../assets/delaration.png";
import maleIcon from "../assets/male-user.svg";
import femaleIcon from "../assets/female-user.svg";

const Resume = ({
  personalData,
  post,
  educationData,
  uploadImage,
  experience,
}) => {
  const [experienced, setExperienced] = useState(false);
  useEffect(() => {
    if (experience) {
      setExperienced(true);
    }
  }, [experience]);

  return (
    <Grid id="resume-content" p={4}>
      <Grid>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            backgroundColor: "#515151",
            color: "#fff",
            fontFamily: "Philosopher",
            width: "100%",
          }}
        >
          Resume
        </Typography>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Box sx={{ textWrap: "wrap" }}>
            <Typography
              variant="h2"
              sx={{ textTransform: "capitalize", fontFamily: "Philosopher" }}
            >
              {personalData?.fullName}
            </Typography>
            <Typography
              sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
              variant="subtitle1"
            >
              <img
                src={personalData?.gender === "Male" ? maleIcon : femaleIcon}
                alt="profile-icon"
                height={25}
                width={25}
              />{" "}
              {personalData?.gender}, {personalData?.marital_status}
            </Typography>
            <Typography sx={{ fontFamily: "Philosopher", fontSize: "30px" }}>DOB : {personalData?.date_of_birth}</Typography>
            <Box className="contact-info">
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
              >
                Email Address:{" "}
                <span style={{ textTransform: "lowercase" }}>
                  {personalData?.email}
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
              >
                Contact Number: {personalData?.contact_no}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "Philosopher",
                  fontSize: "30px",
                }}
              >
                Postal Address: {personalData?.address}
              </Typography>
            </Box>
          </Box>
          <Box>
            <img
              src={uploadImage}
              alt="Candidate_Photo"
              style={{
                borderRadius: "5%",
                maxWidth: "100px",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h4"
            pt={1}
            pb={1}
          >
            <img src={profileIcon} alt="profile-icon" height={25} width={25} />{" "}
            Profile
          </Typography>

          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h6"
            pl={3}
            pr={3}
            textAlign="justify"
          >
            Dedicated and passionate with a proven track record of fostering a
            positive and inclusive learning environment. Adept at designing
            engaging lesson plans tailored to diverse learning styles, promoting
            active participation, and integrating technology to enhance my
            experience. Seeking a challenging position where I can leverage my
            expertise in {post} to inspire a love for learning and contribute to
            the academic growth of Organization/Institute.
          </Typography>
        </Box>
        <Box className="education">
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h4"
            pt={1}
            pb={1}
            mt={1}
          >
            <img
              src={educationIcon}
              alt="education-icon"
              height={25}
              width={25}
            />{" "}
            Education
          </Typography>
          <Box p={3} textAlign="justify">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "25px" }}>
                      Class/Degree
                    </TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>
                      Board/University
                    </TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>
                      Passing Year
                    </TableCell>
                    <TableCell sx={{ fontSize: "25px" }}>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {educationData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{ fontSize: "20px", textTransform: "capitalize" }}
                      >
                        {item["Class/Degree"]}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "20px", textTransform: "uppercase" }}
                      >
                        {item["Board/University"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        {item["Passing Year"]}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }}>
                        {item?.Percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box className="experience">
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h4"
            pt={1}
            pb={1}
          >
            <img
              src={experienceIcon}
              alt="experience-icon"
              height={30}
              width={30}
            />{" "}
            Work Experience
          </Typography>
          {experience.length ? (
            experience.map((data) => (
              <Box textAlign="justify" key={data?.id}>
                <Typography sx={{ fontFamily: "Philosopher" }} pl={2}>
                  <span
                    style={{ textTransform: "capitalize", fontSize: "25px" }}
                  >
                    &#x25CF; {data?.Organization}
                  </span>
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      sx={{ fontFamily: "Philosopher" }}
                      variant="h6"
                      pl={5}
                      style={{ textTransform: "capitalize" }}
                    >
                      Designation: {data?.Post}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "400px",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "Philosopher", fontSize: "20px" }}
                      variant="subtitle1"
                    >
                      Start Date: {data["Start Date"]}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "Philosopher", fontSize: "20px" }}
                      variant="subtitle1"
                    >
                      End Date: {data["End Date"]}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
                  pt={1}
                  pl={5}
                >
                  {data.Description}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography
              sx={{ fontFamily: "Philosopher", fontSize: "25px" }}
              variant="h6"
              pl={2}
              textAlign="justify"
            >
              <span style={{ fontSize: "30px" }}>&#x25CF;</span> Fresher
            </Typography>
          )}
        </Box>

        <Box>
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h4"
            pt={2}
            pb={1}
          >
            <img
              src={declaration}
              alt="declaration-icon"
              height={25}
              width={25}
            />{" "}
            Declaration
          </Typography>
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            pl={3}
            pr={3}
            textAlign="justify"
            variant="subtitle1"
          >
            I hereby declare that all the information furnished above is true to
            the best of my knowledge and belief. I am willing to provide
            additional information and supporting documents as required. Thank
            you for considering my application.
          </Typography>
          <Typography
            variant="h6"
            pl={3}
            pt={1}
            sx={{
              textTransform: "capitalize",
              fontFamily: "Philosopher",
              fontSize: "30px",
            }}
          >
            {personalData.fullName}
          </Typography>
          <Typography
            sx={{ fontFamily: "Philosopher", fontSize: "30px" }}
            variant="h6"
            pl={3}
            pt={1}
          >
            Date:
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Resume;
