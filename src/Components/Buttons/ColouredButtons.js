import Button from "@mui/material/Button";

function RedButton(props) {
  return (
    <Button color="red" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function BlueButton(props) {
  return (
    <Button color="blue" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function GreenButton(props) {
  return (
    <Button color="green" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function PinkButton(props) {
  return (
    <Button color="pink" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function OrangeButton(props) {
  return (
    <Button color="orange" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export { RedButton, BlueButton, GreenButton, PinkButton, OrangeButton };
