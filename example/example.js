import {
  BasicComponent,
  ComponentWithProps,
  OldStyleComponent,
} from './component';
import CustomReactElements from '../dist/custom-react-elements';

CustomReactElements.define('basic-component', BasicComponent);
CustomReactElements.define('component-with-props', ComponentWithProps);
CustomReactElements.define('old-style-component', OldStyleComponent);
