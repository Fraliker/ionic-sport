import {QuestionBase} from './question-base';

export class RadioQuestion extends QuestionBase<string> {

  controlType = 'radio';
  name: string;

  constructor(options: {} = {}) {
    super(options);
  }
}
