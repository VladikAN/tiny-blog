import * as React from "react";
import { strings } from "../../localization";

interface OwnProps {
    date?: Date;
}

export type AllProps = OwnProps;

const months: string[] = [
    strings.shared_month_jan,
    strings.shared_month_feb,
    strings.shared_month_mar,
    strings.shared_month_apr,
    strings.shared_month_may,
    strings.shared_month_jun,
    strings.shared_month_jul,
    strings.shared_month_aug,
    strings.shared_month_sept,
    strings.shared_month_okt,
    strings.shared_month_nov,
    strings.shared_month_dec
];

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