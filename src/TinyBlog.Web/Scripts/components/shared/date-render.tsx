import * as React from "react";

interface OwnProps {
    date?: Date;
}

type AllProps = OwnProps;

const months: string[] = ["jan", "feb", "mar", "apr","may", "jun", "jul", "aug", "sept", "okt", "nov", "dec"];

export default class DateRender extends React.Component<AllProps> {
    public render(): React.ReactNode {
        const { date } = this.props;
        if (date == null) {
            return null;
        }

        let converted = new Date(date);
        return (<span>{months[converted.getMonth()]} {converted.getFullYear()}</span>);
    }
}