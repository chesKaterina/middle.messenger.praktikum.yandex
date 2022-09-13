import {nanoid} from 'nanoid';
import {TemplateDelegate} from 'handlebars';
import {EventBus} from './EventBus';

export default class Block<Props extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public id = nanoid(6);

    protected props: Props;

    private eventBus: () => EventBus;

    private _element: HTMLElement = document.createElement('div');

    private readonly _meta: { tagName: string, props: any };

    // eslint-disable-next-line no-use-before-define
    protected children: Record<string, Block | any[]>;

    constructor(tagName = 'div', propsWithChildren?: Props) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            tagName,
            props,
        };

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        this.eventBus().emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: Props | object = {}) {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | any[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.every(v => v instanceof Block)) {
                children[key] = value;
            } else if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {props: props as Props, children};
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private _init(): void {
        this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected init(): void {
    }

    private _render(): void {
        const block = this.render();
        this._element.innerHTML = '';
        this._element.append(block);
        this._addEvents();
    }

    protected compile(template: TemplateDelegate, context: any) {
        const contextAndStubs = {...context};
        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                const components: string[] = [];
                component.forEach((element) => components.push(`<div data-id="${element.id}"></div>`));
                contextAndStubs[name] = components;
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');
        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((element) => {
                    const stub = temp.content.querySelector(`[data-id="${element.id}"]`);
                    if (!stub) {
                        return;
                    }
                    stub.replaceWith(element.getContent());
                });
            } else {
                const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

                if (!stub) {
                    return;
                }
                stub.replaceWith(component.getContent());
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {
    }

    protected dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    private _makePropsProxy(props: Props) {
        return new Proxy(props, {
            set: (target, property: string, value) => {
                const oldTarget = {...target};
                target[property as keyof Props] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    public setProps(nextProps: Props): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    protected get element(): HTMLElement {
        return this._element;
    }

    public getContent(): HTMLElement {
        return this.element;
    }

    _addEvents(): void {
        const {events = {}} = this.props as { events?: Record<string, () => void> };
        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    protected show(): void {
        this.getContent().style.display = 'block';
    }

    protected hide(): void {
        this.getContent().style.display = 'none';
    }
}
