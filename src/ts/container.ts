import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const container = new Container();
const decorators = getDecorators(container);
export const lazyInject = decorators.lazyInject;
