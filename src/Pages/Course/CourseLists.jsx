import React from "react";
import { Header, Table, Rating, Icon } from "semantic-ui-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { getAllCourses, deleteCourse } from "../../actions/courseAction";
import { Button } from "@material-ui/core";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  SET_BANNER,
  SET_SUB_CATEGORY_ID,
  SET_VIDEO_URL,
  SET_COURSE_TYPE,
  SET_IS_FREE,
  SET_PRICE,
  SET_BANNER_THUMBNAIL,
  SET_OBJECTIVE,
  SET_DIFFICULTY,
  SET_DESCRIPTION,
  SET_TITLE,
  COURSE_UPLOADED,
  COURSE_FIELD_HAS_ERROR,
  ERR_UPLOADING_COURSE,
  UPLOAD_COURSE,
  SET_DURATION,
  VIDEO_PUBLIC_ID,
  SET_LANGUAGE,
  SET_CAREER_CATEGORY,
  IMAGE_PUBLIC_ID,
  SET_SUBTITLE,
  IS_UPDATE,
} from "../../actions/types";
// import windowSize from 'react-window-size';

const CourseLists = (props) => {
  useEffect(() => {
    props.getAllCourses();
  }, []);
  const dispatch = useDispatch();
  const history = useHistory()
  const handleUpdate = ({ course }) => {
    course.banner && dispatch({ type: SET_BANNER, payload: course.banner });
    course.career_category_id &&
      dispatch({
        type: SET_SUB_CATEGORY_ID,
        payload: course.career_category_id,
      });
    course.courseType &&
      dispatch({ type: SET_COURSE_TYPE, payload: course.courseType });
    course.course_difficulty &&
      dispatch({ type: SET_DIFFICULTY, payload: course.course_difficulty });
    course.description &&
      dispatch({ type: SET_DESCRIPTION, payload: course.description });
    course.isFree && dispatch({ type: SET_IS_FREE, payload: course.isFree });
    course.language &&
      dispatch({ type: SET_LANGUAGE, payload: course.language });
    course.objective &&
      dispatch({ type: SET_OBJECTIVE, payload: course.objective });
    // course.prerequisite && dispatch({type: SET_LANGUAGE, payload: course.prerequisite })
    course.price && dispatch({ type: SET_PRICE, payload: course.price });
    course.sub_category_id &&
      dispatch({ type: SET_SUB_CATEGORY_ID, payload: course.sub_category_id });
    course.subtitle &&
      dispatch({ type: SET_SUBTITLE, payload: course.subtitle });
    course.title && dispatch({ type: SET_TITLE, payload: course.title });
    course.videoUrl &&
      dispatch({ type: SET_VIDEO_URL, payload: course.videoUrl });
    dispatch({ type: IS_UPDATE, payload: true });
    history.push("/courses");
  };
  const { path } = useRouteMatch();
  return (
    <div>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine> #</Table.HeaderCell>
            <Table.HeaderCell singleLine>Title</Table.HeaderCell>
            <Table.HeaderCell singleLine>Status</Table.HeaderCell>
            <Table.HeaderCell singleLine>courseCode</Table.HeaderCell>
            <Table.HeaderCell singleLine>Course Type</Table.HeaderCell>
            <Table.HeaderCell singleLine>Free / Paid</Table.HeaderCell>
            <Table.HeaderCell singleLine>completed</Table.HeaderCell>
            <Table.HeaderCell singleLine>Course Difficulty</Table.HeaderCell>
            <Table.HeaderCell singleLine></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.isGettingCourses ? (
            <>
              <Table.Row>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Skeleton anmation={"wave"} />{" "}
                </Table.Cell>
              </Table.Row>
            </>
          ) : props.courses.length > 0 ? (
            props.courses.map((course) => (
              <Table.Row key={course.key}>
                <Table.Cell singleLine>banner </Table.Cell>
                <Table.Cell singleLine>{course.title} </Table.Cell>
                <Table.Cell singleLine>
                  {!course.banner || !course.videoUrl
                    ? "Course Upload incomplete"
                    : course.ApprovedBy
                    ? "Yet to be approve"
                    : "Approved"}{" "}
                </Table.Cell>
                <Table.Cell singleLine> {course.courseCode} </Table.Cell>
                <Table.Cell textAlign="center">
                  {course.isCareer === "1" && (
                    <Icon color="green" name="checkmark" size="large" />
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">{course.courseType}</Table.Cell>
                <Table.Cell>
                  {course.videoUrl && <Icon name="check" color="green" />}
                </Table.Cell>
                <Table.Cell singleLine>
                  <Button
                    component={Link}
                    to={`/courses/modules/${course.slug}`}
                    variant="primary"
                  >
                    Add Modules{" "}
                  </Button>
                  <br />
                  <Button
                    variant="primary"
                    onClick={() => props.deleteCourse(course.id)}
                  >
                    Delete Course{" "}
                  </Button>
                  <br />
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate({ course })}
                  >
                    {course.videoUrl ? "Edit Course" : "Continue Upload"}{" "}
                  </Button>
                </Table.Cell>
                <Table.Cell singleLine> </Table.Cell>
              </Table.Row>
            ))
          ) : (
            "You are yet to upload a course"
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
const mapStateToProps = (state) => ({
  allCategories: state.course.allCategories,
  courses: state.course.courses,
  isGettingCourses: state.course.isGettingCourses,
  fetchCoursesError: state.course.fetchCoursesError,
});

const mapDispatchToProps = {
  getAllCourses,
  deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseLists);
