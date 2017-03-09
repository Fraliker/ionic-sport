import {QuestionBase} from './question-base';


export class InputQuestion extends QuestionBase<string> {

  controlType = 'checkbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
