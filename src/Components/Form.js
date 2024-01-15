import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Resume from "./Resume";
import Navbar from "../Components/Navbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const maritalStatus = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
];

const profile = [
  {
    label: "Teaching",
    value: "Teaching",
  },
  {
    label: "Banking",
    value: "Banking",
  },
  {
    label: "Finance",
    value: "Finance",
  },
  {
    label: "Administration",
    value: "Administration",
  },
  {
    label: "Operation",
    value: "Operation",
  },
];

const experienceOption = [
  { value: "Experienced", label: "Yes" },
  { value: "Fresher", label: "No" },
];

const CandidateInfo = ({ isResumeReady }) => {
  const [personalData, setPersonalData] = useState({
    fullName: "",
    contact_no: "",
    email: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    language: "",
    address: "",
  });
  const [post, setPost] = useState("");
  const [educationData, setEducationData] = useState([]);
  const [educationDtl, setEducationDtl] = useState({
    "Class/Degree": "",
    "Board/University": "",
    "Passing Year": "",
    Percentage: "",
  });
  const [uploadImage, setUploadImage] = useState(null);
  const handleChangePD = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };
  const [hasExperience, setHasExperience] = useState();
  const [experience, setExperience] = useState([]);
  const [experienceDtl, setExperienceDtl] = useState({
    Organization: "",
    "Start Date": "",
    "End Date": "",
    Post: "",
    Description: "",
  });
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangeED = (e) => {
    const { name, value } = e.target;
    setEducationDtl({ ...educationDtl, [name]: value });
  };

  const handleResetED = () => {
    setEducationDtl({
      "Class/Degree": "",
      "Board/University": "",
      "Passing Year": "",
      Percentage: "",
    });
  };

  const handleAddQualification = () => {
    const uniqueId = Date.now();
    setEducationData([
      ...educationData,
      { id: uniqueId, ...educationDtl }, // Use a new object for each qualification
    ]);
    handleResetED();
  };

  const handleChangePRD = (e) => {
    const { name, value } = e.target;
    setExperienceDtl({ ...experienceDtl, [name]: value });
  };

  const handleResetPRD = () => {
    setExperienceDtl({
      Organization: "",
      "Start Date": "",
      "End Date": "",
      Post: "",
      Description: "",
    });
  };

  const handleAddExperience = () => {
    const uniqueId = Date.now();
    setExperience([...experience, { id: uniqueId, ...experienceDtl }]);
    handleResetPRD();
  };
  console.log(educationData);
  return (
    <>
      {isResumeReady ? (
        <Resume
          personalData={personalData}
          post={post}
          educationData={educationData}
          uploadImage={uploadImage}
          experience={experience}
        />
      ) : (
        <>
          <Navbar />
          {/* Personal Information Section */}

          <Grid mt={5} ml={5}>
            <Typography mt={10} mb={2} variant="h5">
              Personal Details
            </Typography>
            <Grid id="personal_info" container>
              <Box>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: "38ch", marginBottom: "20px" }}
                >
                  Upload Your Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                xs={12}
              >
                <TextField
                  id="outlined-basic"
                  label="Enter your name"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="fullName"
                  value={personalData.fullName}
                  onChange={handleChangePD}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your contact number"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="contact_no"
                  value={personalData.contact_no}
                  onChange={handleChangePD}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your email"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="email"
                  value={personalData.email}
                  onChange={handleChangePD}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} InputLabel>
                  <DatePicker
                    readOnly={true}
                    label="Select your DOB"
                    sx={{ marginBottom: "10px", width: "38ch" }}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        date_of_birth: new Date(`${e.$d}`)
                          .toUTCString()
                          .slice(5, 16),
                      })
                    }
                  />
                </LocalizationProvider>
                <TextField
                  id="filled-select-gender"
                  select
                  label="Gender"
                  defaultValue=""
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  variant="outlined"
                  name="gender"
                  value={personalData.gender}
                  onChange={handleChangePD}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="filled-select-marital-status"
                  select
                  label="Marital status"
                  defaultValue=""
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  variant="outlined"
                  name="marital_status"
                  value={personalData.marital_status}
                  onChange={handleChangePD}
                >
                  {maritalStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-basic"
                  label="Enter Language known"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="language"
                  value={personalData.language}
                  onChange={handleChangePD}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your address"
                  variant="outlined"
                  sx={{ width: "38ch" }}
                  multiline
                  rows={3}
                  spellCheck={false}
                  name="address"
                  value={personalData.address}
                  onChange={handleChangePD}
                />
              </Box>
            </Grid>
          </Grid>
          {/* Profile Section */}

          <Grid id="profile" ml={5}>
            <Typography variant="h5" mb={2}>
              Applying Profile
            </Typography>
            <TextField
              id="filled-select-marital-status"
              select
              label="Applying profile"
              defaultValue=""
              sx={{ marginBottom: "10px", width: "38ch" }}
              variant="outlined"
              onChange={(e) => setPost(e.target.value)}
            >
              {profile.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Education Section */}

          <>
            <Grid id="education_details" ml={5} mt={5}>
              <Typography variant="h5" mb={2}>
                Education Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                xs={12}
              >
                <TextField
                  id="outlined-basic"
                  label="Class/Degree"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="Class/Degree"
                  value={educationDtl["Class/Degree"]}
                  onChange={handleChangeED}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your Board or University name"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="Board/University"
                  value={educationDtl["Board/University"]}
                  onChange={handleChangeED}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your passing year"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="Passing Year"
                  value={educationDtl["Passing Year"]}
                  onChange={handleChangeED}
                />
                <TextField
                  id="outlined-basic"
                  label="Enter your percentage/CGPA"
                  variant="outlined"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  name="Percentage"
                  value={educationDtl.Percentage}
                  onChange={handleChangeED}
                />
              </Box>
              <Button
                variant="contained"
                sx={{ marginBottom: "10px", width: "38ch" }}
                onClick={handleAddQualification}
              >
                Add Qualification
              </Button>
            </Grid>
            {educationData.length ? (
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
                      <TableCell sx={{ fontSize: "25px" }}>
                        Percentage
                      </TableCell>
                      <TableCell sx={{ fontSize: "25px" }}>
                        Action
                      </TableCell>
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
            ) : (
              ""
            )}
          </>

          {/* Professional Data */}

          <>
            <Typography variant="h5" mt={5} ml={5} mb={2}>
              Professional Details
            </Typography>

            <TextField
              id="filled-select-gender"
              select
              label="Experienced"
              defaultValue=""
              sx={{ marginBottom: "10px", width: "38ch", marginLeft: "40px" }}
              variant="outlined"
              name="hasExperience"
              onChange={(e) => setHasExperience(e.target.value)}
            >
              {experienceOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {hasExperience === "Experienced" ? (
              <Grid id="experience" mt={5} ml={5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                  xs={12}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Organization name"
                    variant="outlined"
                    sx={{ marginBottom: "10px", width: "38ch" }}
                    name="Organization"
                    value={experienceDtl.Organization}
                    onChange={handleChangePRD}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs} InputLabel>
                    <DatePicker
                      label="Start date"
                      sx={{ marginBottom: "10px", width: "38ch" }}
                      onChange={(e) =>
                        setExperienceDtl({
                          ...experienceDtl,
                          "Start Date": new Date(`${e.$d}`)
                            .toUTCString()
                            .slice(5, 16),
                        })
                      }
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs} InputLabel>
                    <DatePicker
                      label="End date"
                      sx={{ marginBottom: "10px", width: "38ch" }}
                      onChange={(e) =>
                        setExperienceDtl({
                          ...experienceDtl,
                          "End Date": new Date(`${e.$d}`)
                            .toUTCString()
                            .slice(5, 16),
                        })
                      }
                    />
                  </LocalizationProvider>
                  <TextField
                    id="outlined-basic"
                    label="Post name"
                    variant="outlined"
                    sx={{ marginBottom: "10px", width: "38ch" }}
                    name="Post"
                    value={experienceDtl.Post}
                    onChange={handleChangePRD}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    sx={{ marginBottom: "10px", width: "100%" }}
                    name="Description"
                    value={experienceDtl.Description}
                    onChange={handleChangePRD}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{ marginBottom: "10px", width: "38ch" }}
                  onClick={handleAddExperience}
                >
                  Add Experience
                </Button>
                {experience.length ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: "25px" }}>
                            Organization
                          </TableCell>
                          <TableCell sx={{ fontSize: "25px" }}>Post</TableCell>
                          <TableCell sx={{ fontSize: "25px" }}>
                            Start Date
                          </TableCell>

                          <TableCell sx={{ fontSize: "25px" }}>
                            End Date
                          </TableCell>
                          <TableCell sx={{ fontSize: "25px" }}>
                            Description
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {experience.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                fontSize: "20px",
                                textTransform: "capitalize",
                              }}
                            >
                              {item["Organization"]}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "20px",
                                textTransform: "uppercase",
                              }}
                            >
                              {item["Post"]}
                            </TableCell>
                            <TableCell sx={{ fontSize: "20px" }}>
                              {item["Start Date"]}
                            </TableCell>
                            <TableCell sx={{ fontSize: "20px" }}>
                              {item["End Date"]}
                            </TableCell>
                            <TableCell sx={{ fontSize: "20px" }}>
                              {item?.Description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  ""
                )}
              </Grid>
            ) : (
              ""
            )}
          </>
        </>
      )}
    </>
  );
};

export default CandidateInfo;
