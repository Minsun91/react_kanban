// import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import Coins from "./Coins";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;
interface RouteParams {
    coinId: string;
}

interface LocationState {
    state: {
        name: string;
        rank: number;
    };
}
interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: ITag[];
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    circulating_supply: string;
    total_supply: string;
    max_supply: string;
    beta_value: string;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            cent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    // const [loading, setLoading] = useState(true);
    // const location = useLocation();
    const { coinId } = useParams() as unknown as RouteParams;
    const { state } = useLocation() as LocationState;

    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    //useMatch는 유저가 특정한 url에 있는지 여부를 알려준다.

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId)
    );
    const { isLoading: tickerLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId)
    );
    //모든 쿼리 키는 유니크한 값을 갖는게 좋다.
    //isLoading:infoLoading (이름을 isloading에서 infoLoading으로 바꾼다)

    const loading = infoLoading || tickerLoading;

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>{state || coinId} </title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Title> {state || coinId} </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>
                                {tickersData?.quotes.USD.price.toFixed(3)}
                            </span>
                            {/* <span>{infoData?.open_source ? "Yes" : "No"}</span> */}
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>
                            CHART <Chart coinId={coinId} /> 
                            </Link>
                        </Tab>

                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>
                             PRICe <Price coinId={coinId} />
                            </Link>
                        </Tab>

                        <Tab isActive={priceMatch !== null || chartMatch !== null} >
                        <Link to={"/"}>
                                HOME 
                            </Link>
                        </Tab>
                    </Tabs>

                    <Routes>
                        <Route path={`/${coinId}/price`} element={<Price coinId={coinId} />} />
                        <Route
                            path={`/${coinId}/chart`}
                            element={<Chart coinId={coinId} />}
                        />
                    </Routes>
                </>
            )}
        </Container>
    );
}
export default Coin;
