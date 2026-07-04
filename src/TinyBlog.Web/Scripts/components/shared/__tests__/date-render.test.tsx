import * as React from 'react';
import { render, screen } from '@testing-library/react';
import DateRender, { AllProps } from '../date-render';

describe('<DateRender />', () => {
    it('should render month name and year', () => {
        const props: AllProps = { date: new Date(2019, 4, 1) };
        render(<DateRender {...props} />);
        expect(screen.getByText(/may 2019/i)).toBeTruthy();
    });

    it('should not render for null props', () => {
        const props: AllProps = { date: null };
        const { container } = render(<DateRender {...props} />);
        expect(container.querySelector('span')).toBeNull();
    });
});
