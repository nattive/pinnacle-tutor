import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
// import  from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Select as MaterialSelect,
  FormHelperText,
  Input as MaterialInput,
  CircularProgress,
  Grid as MaterialGrid,
  Avatar,
} from "@material-ui/core";
import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from 'react-dropzone-uploader'
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useDropzone } from "react-dropzone";
import {
  Icon,
  Container,
  Button,
  Grid,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Header,
  Label,
  CardHeader,
} from "semantic-ui-react";
import { Divider, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  uploadCourse,
  getAllMainCategories,
  getAllCoFCategories,
  updateCourse,
} from "../../actions/courseAction";
import {
  SET_TITLE,
  SET_SUBTITLE,
  SET_SUB_CATEGORY_ID,
  SET_VIDEO_URL,
  LOAD_SUB_CAT,
  SET_BANNER,
  SET_COURSE_TYPE,
  SET_IS_FREE,
  SET_PRICE,
  SET_OBJECTIVE,
  SET_DIFFICULTY,
  SET_DESCRIPTION,
  IMAGE_PUBLIC_ID,
  VIDEO_PUBLIC_ID,
  SET_LANGUAGE,
  SET_DURATION,
  SET_COURSE_PUBLIC_ID,
  SET_CAREER_CATEGORY,
} from "../../actions/types";
import { baseUrl, cloudName, upload_preset } from "../../constants/baseUrl";
import { Image, Video } from "cloudinary-react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    // overflowX: 'scroll'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Course Basic Information",
    "Upload course Media",
    "Course Objective and Description",
  ];
}

const CreateStep = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const dispatch = useDispatch();
  const title = useSelector((state) => state.courseField.title);
  const subtitle = useSelector((state) => state.courseField.subtitle);
  const videoUrl = useSelector((state) => state.courseField.videoUrl);
  const sub_category_id = useSelector(
    (state) => state.courseField.sub_category_id
  );
  const banner = useSelector((state) => state.courseField.banner);
  const isFree = useSelector((state) => state.courseField.isFree);
  const price = useSelector((state) => state.courseField.price);
  const language = useSelector((state) => state.courseField.language);
  const tutor_id = useSelector((state) => state.courseField.tutor_id);
  const allMainCategories = useSelector(
    (state) => state.course.allMainCategories
  );
  const loadSubCategory = useSelector((state) => state.course.loadSubCategory);
  const course_difficulty = useSelector(
    (state) => state.courseField.course_difficulty
  );
  const hasError = useSelector((state) => state.courseField.hasError);
  const courseType = useSelector((state) => state.courseField.courseType);
  const [mainCat, setMainCat] = useState();
  const [subCat, setSubCat] = useState();
  const options = [
    { key: "Easy", text: "Easy", value: "Easy" },
    { key: "Medium", text: "Medium", value: "Medium" },
    { key: "Top Level", text: "Top Level", value: "Top Level" },
  ];
  const courseTypeOptions = [
    { key: "isPO", text: "Pinnacle Ulearn", value: "isPO" },
    { key: "isCareer", text: "Career of the future", value: "isCareer" },
  ];

  const stepOne = [
    {
      name: courseType,
      control: Select,
      label: "Set The course Type",
      placeholder: "",
      options: courseTypeOptions,
      onChange: (e, { value }) =>
        dispatch({ type: SET_COURSE_TYPE, payload: value }),
    },
    {
      name: title,
      error: { content: "Please enter Title of the course", pointing: "below" },
      control: Input,
      label: "Course Title",
      placeholder: "e.g Introduction To Pinnacle Courses",
      onChange: (e) => dispatch({ type: SET_TITLE, payload: e.target.value }),
    },
    {
      name: subtitle,
      control: Input,
      error: { content: "Please enter Title of the course", pointing: "below" },
      max: 100,
      label: "Add a brief subtitle to describe what the course offers",
      placeholder:
        "e.g Learn Android App Development with Java, Build real time apps like WhatsApp and Instagram",
      onChange: (e) =>
        dispatch({ type: SET_SUBTITLE, payload: e.target.value }),
    },

    {
      name: isFree,
      control: Checkbox,
      type: "checkbox",
      label: "Make This course Free for students",
      placeholder: "",
      onChange: () => {
        dispatch({ type: SET_IS_FREE, payload: !isFree });
      },
    },
  ];
  const stepOneMini = [
    {
      name: course_difficulty,
      required: true,
      control: Select,
      label: "Set difficulty level for this course",
      placeholder: "",
      options,
      onChange: (e, { value }) =>
        dispatch({ type: SET_DIFFICULTY, payload: value }),
    },
    {
      name: price,
      control: Input,
      disabled: Boolean(isFree),
      type: "number",
      // error: { content: 'Please enter Title of the course', pointing: 'below' }, control: Input,
      label: isFree ? "This course is free" : "Course Price",
      small: "If this is not free, How much does this course cost",
      placeholder: "e.g Introduction To Pinnacle Courses",
      onChange: (e) => dispatch({ type: SET_PRICE, payload: e.target.value }),
    },
    {
      name: language,
      control: Input,
      type: "number",
      // error: { content: 'Please enter Title of the course', pointing: 'below' }, control: Input,
      label: "Leave empty if it's english",
      placeholder: "The language this video was recorded in",
      onChange: (e) =>
        dispatch({ type: SET_LANGUAGE, payload: e.target.value }),
    },
  ];

  const classes = useStyles();

  return (
    <Container>
      <Card>
        <CardHeader>
          <Typography variant="h4" color="primary" gutterBottom>
            Basic information about the course
          </Typography>
        </CardHeader>
        <CardContent>
          <Divider style={{ margin: 2 }} />
          <Form.Group>
            <MaterialGrid container spacing={2}>
              {stepOne.map((input) => (
                <MaterialGrid item xs={12} md={6}>
                  <Form.Field
                    required
                    fluid
                    size="large"
                    maxLength={input.max}
                    type={input.type}
                    error={hasError && input.name === "" && input.error}
                    width={5}
                    checked={input.type === "checkbox" && input.name}
                    value={input.name}
                    options={input.options}
                    control={input.control}
                    onChange={input.onChange}
                    style={{ margin: 5 }}
                    label={input.label}
                    placeholder={input.placeholder}
                  />
                  <br />
                </MaterialGrid>
              ))}
            </MaterialGrid>
            {courseType !== "isCareer" ? (
              <MaterialGrid container spacing={2}>
                <MaterialGrid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Main Category
                    </InputLabel>
                    <MaterialSelect
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={mainCat}
                      onChange={(e) => {
                        setMainCat(e.target.value && e.target.value.name);
                        dispatch({
                          type: LOAD_SUB_CAT,
                          payload: e.target.value,
                        });
                      }}
                      label="Course Category"
                    >
                      <MenuItem disabled value="null">
                        <em>-- select main category --</em>
                      </MenuItem>
                      {allMainCategories.map((main) => (
                        <MenuItem value={main} key={main.id}>
                          {main.name}
                        </MenuItem>
                      ))}
                    </MaterialSelect>
                    <FormHelperText>
                      Select from the main category list that best describe your
                      course
                    </FormHelperText>
                  </FormControl>
                </MaterialGrid>
                <MaterialGrid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {" "}
                      Category
                    </InputLabel>
                    <MaterialSelect
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={subCat}
                      onChange={(e) => {
                        setSubCat(e.target.value && e.target.value.name);
                        dispatch({
                          type: SET_SUB_CATEGORY_ID,
                          payload: e.target.value,
                        });
                      }}
                      label="Course Category"
                    >
                      <MenuItem disabled value="null">
                        <em>-- select main category --</em>
                      </MenuItem>
                      {loadSubCategory.sub_categories &&
                        loadSubCategory.sub_categories.map((main) => (
                          <MenuItem value={main.id} key={main.id}>
                            {main.name}
                          </MenuItem>
                        ))}
                    </MaterialSelect>
                  </FormControl>
                </MaterialGrid>
              </MaterialGrid>
            ) : (
              <>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    {" "}
                    Set CoF Category
                  </InputLabel>
                  <MaterialSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={subCat}
                    onChange={(e) => {
                      setSubCat(e.target.value && e.target.value.name);
                      dispatch({
                        type: SET_CAREER_CATEGORY,
                        payload: e.target.value,
                      });
                    }}
                    label="Course Category"
                  >
                    <MenuItem disabled value="null">
                      <em>-- select main category --</em>
                    </MenuItem>
                    {loadSubCategory.sub_categories &&
                      loadSubCategory.sub_categories.map((main) => (
                        <MenuItem value={main.id} key={main.id}>
                          {main.name}
                        </MenuItem>
                      ))}
                  </MaterialSelect>
                </FormControl>
              </>
            )}
          </Form.Group>
          <Form>
            <Form>
              <MaterialGrid container spacing={2}>
                {stepOneMini.map((input) => (
                  <MaterialGrid item xs={12} md={6}>
                    <Form.Field
                      required={input.required}
                      id="form-input-control-error-email"
                      size="large"
                      type={input.type}
                      // width={5}
                      checked={input.type === "checkbox" && input.name}
                      value={input.name}
                      options={input.options}
                      control={input.control}
                      onChange={input.onChange}
                      disabled={input.disabled}
                      style={{ margin: 5 }}
                      label={input.label}
                      placeholder={input.placeholder}
                    />
                  </MaterialGrid>
                ))}
              </MaterialGrid>
            </Form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

const StepTwo = () => {
  const [sub_category_id, setSubCategoryId] = useState();
  const [banner, setBanner] = useState();
  const [video, setVideo] = useState("");
  const [showUpload, setShowUpload] = useState();
  const [tutor_id, setTutor_id] = useState();
  const dispatch = useDispatch();

  // specify upload params and url for your files

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();
  const handleUploadVideo =
    window.cloudinary &&
    window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        upload_preset: upload_preset,
        multiple: false,
        autoMinimize: true,
        themes: "minimal",
        sources: ["local", "url", "dropbox"],
        clientAllowedFormats: ["mp4", "avi", "mpeg"],
        text: {
          en: {
            local: {
              browse: "Upload Video",
              main_title: "Upload Video",
              dd_title_single: "Drag and Drop a video file here",
              dd_title_multi: "Drag and Drop a video file here",
              drop_title_single: "Drag and Drop a video file here",
              drop_title_multiple: "Drag and Drop a video file here",
            },
          },
        },
      },
      (error, result) => {
        if (result.event == "success") {
          console.log(result);
          console.log(result.info.duration);
          dispatch({ type: SET_VIDEO_URL, payload: result.info.url });
          setVideo(result.info.public_id);
          dispatch({ type: SET_DURATION, payload: result.info.duration });
          dispatch({ type: VIDEO_PUBLIC_ID, payload: result.info.public_id });
          setShowUpload(true);
          // dispatch({ type: SET_BANNER_THUMBNAIL, payload: result.info.url })
          console.log(result.info); // result.info contains data from upload
        }
      }
    );

  const handleUpload =
    window.cloudinary &&
    window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        upload_preset: upload_preset,
        multiple: false,
        autoMinimize: true,
        themes: "minimal",
        sources: ["local", "url", "dropbox"],
        clientAllowedFormats: ["jpg", "jpeg", "png"],

        text: {
          en: {
            local: {
              browse: "Upload image",
              main_title: "Upload Image Banner",
              dd_title_single: "Drag and Drop a Image file here",
              dd_title_multi: "Drag and Drop a Image file here",
              drop_title_single: "Drag and Drop a Image file here",
              drop_title_multiple: "Drag and Drop a Image file here",
            },
          },
        },
      },
      (error, result) => {
        if (result.event == "success") {
          setShowUpload(true);
          setBanner(result.info.public_id);
          dispatch({ type: SET_BANNER, payload: result.info.url });
          dispatch({ type: IMAGE_PUBLIC_ID, payload: result.info.public_id });
          console.log(result.info); // result.info contains data from upload
        }
      }
    );

  return (
    <MaterialGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <MaterialGrid item xs={12}>
        <Header
          textAlign="center"
          content=" Upload media files for your course"
          subheader="Upload video and image for the course"
        />
      </MaterialGrid>
      <MaterialGrid item xs>
        <Avatar
          style={{ margin: 10, width: 100, height: 100 }}
          onClick={() => handleUpload.open()}
          variant="square"
        />
        <Typography variant="body1">
          {" "}
          Click to upload cover banner for course{" "}
        </Typography>
      </MaterialGrid>
      <MaterialGrid item xs>
        {showUpload && (
          <Video
            controls
            publicId={video}
            width="300"
            cloudName={cloudName}
            crop="scale"
          />
        )}
        <Button
          //   variant="contained"
          style={{ margin: 10 }}
          onClick={() => handleUploadVideo.open()}
          color="blue"
        >
          Video Upload{" "}
        </Button>
      </MaterialGrid>
    </MaterialGrid>
  );
};

const StepThree = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const description = useSelector(state => state.courseField.description)
  const dispatch = useDispatch();
  // SET_DESCRIPTION
  return (
    <Container>
      <div style={{ margin: "10px" }}>
        <Typography variant="h6">Course Objective</Typography>
        <Typography variant="subtitle2">
          Write in Detail the aim of this course
        </Typography>
        <Form>
          <TextArea
            onChange={(e) =>
              dispatch({ type: SET_OBJECTIVE, payload: e.target.value })
            }
          />
        </Form>
      </div>
      <Divider style={{ margin: 10 }} />
      <StepFour />
    </Container>
  );
};

const StepFour = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Container>
      <div style={{ margin: "10px" }}>
        <Typography variant="h6">Course Description</Typography>
        <Typography variant="subtitle2">
          Describe the course to prospective students, let the know how the can
          get the best off the course{" "}
        </Typography>
        <Editor
          toolbar={[
            // [groupName, [list of button]]
            ["style", ["bold", "italic", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
          ]}
          editorStyle={{ width: "100%", height: "100px" }}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={(state) => {
            setEditorState(state);
            dispatch({
              type: SET_DESCRIPTION,
              payload: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
            });
          }}
        />
      </div>
    </Container>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <CreateStep />;

    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    case 3:
      return <StepFour />;
    case 4:
      return <p>All course upload successfully</p>;
    default:
      return "Unknown step";
  }
}

function CourseView(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const { title, videoUrl, sub_category_id, banner } = props;
  useEffect(() => {
    props.courseType === "isCareer"
      ? props.getAllCoFCategories()
      : props.getAllMainCategories();
  }, [props.courseType]);
  useEffect(() => {
    if (props.uploadedCourse && props.uploadedCourse.id) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [props.uploadedCourse]);
  // useEffect(() => {
  //     if (props.updateSuccess) {
  //         setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     }

  // }, [props.updateSuccess])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleUploadCourse = () => {
    props.uploadCourse();
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ margin: 15 }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset} color="red">
              Reset
            </Button>
          </div>
        ) : (
          <Card>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <CardActions style={{ margin: 15 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {props.isUpdate && (
                <Button
                  disabled={activeStep === 2}
                  onClick={handleNext}
                  className={classes.button}
                  color="green"
                >
                  Looks Good here, Skip
                </Button>
              )}
              {activeStep === 0 ? (
                <Button
                  color="red"
                  onClick={handleUploadCourse}
                  className={classes.button}
                >
                  {props.uploadingCourse ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Next"
                  )}
                </Button>
              ) : (
                <Button
                  //   variant="contained"
                  color="red"
                  onClick={
                    activeStep === steps.length - 1
                      ? props.updateCourse
                      : handleNext
                  }
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  title: state.courseField.title,
  videoUrl: state.courseField.videoUrl,
  isUpdate: state.courseField.isUpdate,
  sub_category_id: state.courseField.sub_category_id,
  banner: state.courseField.banner,
  courseType: state.courseField.courseType,
  isFree: state.courseField.isFree,
  price: state.courseField.price,
  objective: state.courseField.objective,
  tutor_id: state.courseField.tutor_id,
  course_difficulty: state.courseField.course_difficulty,
  description: state.courseField.description,
  uploadedCourse: state.courseField.uploadedCourse,
  uploadingCourse: state.course.uploadingCourse,
  uploadingError: state.course.uploadingError,
  allMainCategories: state.course.allMainCategories,
  updateSuccess: state.course.updateSuccess,
  loadSubCategory: state.course.loadSubCategory,
});

const mapDispatchToProps = {
  uploadCourse,
  getAllMainCategories,
  getAllCoFCategories,
  updateCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseView);
