import SchoolCreation from './SchoolCreation';
import ClassCreation from './ClassCreation';
import CourseCreation from './CourseCreation';
import ExerciceCreation from './ExerciceCreation';
import ExerciceSetCreation from './ExerciceSetCreation';
import ChapterCreation from './ChapterCreation'
import SubchapterCreation from './SubchapterCreation';
import LessonCreation from './LessonCreation';
import StepCreation from './StepCreation';
import { IContentType } from '../../../types';

export type IProps = {
  options: {
    [value: string]: any;
  };
};

const content: Record<IContentType, React.FC<IProps>> =  {
  SchoolCreation,
  ClassCreation,
  CourseCreation,
  ExerciceCreation,
  ExerciceSetCreation,
  ChapterCreation,
  SubchapterCreation,
  LessonCreation,
  StepCreation
};

export default content
