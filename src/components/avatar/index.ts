import Block from "../../utils/Block";
import template from "./avatar.hbs";

interface AvatarProps {
  link: string;
  events: {
    click: (evt: Event) => void;
  };
}

export class Avatar extends Block<AvatarProps> {
  public constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
