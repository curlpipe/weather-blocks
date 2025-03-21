import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadForecasts } from './forecastsSlice';

function Forecasts() {
    const dispatch = useDispatch();
    const forecasts = useSelector(state => state.forecasts);

    useEffect(() => {
        dispatch(loadForecasts());
    }, [dispatch]);

    return (
        <>
        </>
    )
}

export default Forecasts;