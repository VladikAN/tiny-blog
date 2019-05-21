import * as React from "react";
import Thread from './../shared/thread';

export default class Dashboard extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                <Thread />
            </div>);
    };
}