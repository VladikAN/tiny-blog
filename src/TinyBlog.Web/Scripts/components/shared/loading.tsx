import * as React from "react";
import { strings } from "../../localization";

export default class Loading extends React.Component {
    public render(): React.ReactNode {
        return (<div>{strings.shared_loading}</div>);
    }
}