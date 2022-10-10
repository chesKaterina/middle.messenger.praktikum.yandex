import { set } from './helpers';
import { EventBus } from './EventBus';
import Block from './Block';

export enum StoreEvents {
  Updated = 'updated'
}
 // У нас есть сотояние
export class Store extends EventBus {
  private state: any = {}; // объекс state, при изменение состояния становится новым объектом

  //Метод set принемает строку и данные и эти данные запишем в состояние, используя строку как тип path
  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  // Метод, который возвращает это состояние
  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){
    let previousState: any;


    return class WithStore extends Component {

      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    }

  }

}

export default store;
