import { useState } from 'react'

const Header = ({text}) => {
    return (
        <h1>
            { text }
        </h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistic = ({statistic}) => {
    if (statistic.good > 0 || statistic.bad > 0 || statistic.neutral > 0) {
        let all = statistic.good + statistic.bad + statistic.neutral
        let average = () => {
            return (statistic.good * 1 + statistic.bad * - 1) / all

        };
        let positive = () => {
            return all > 0 ? (statistic.good / all) * 100 : 0
        };

        return (
            <table>
                <tbody>
                    <StatisticLine text="good" value={statistic.good}/>
                    <StatisticLine text="neutral" value={statistic.neutral}/>
                    <StatisticLine text="bad" value={statistic.bad}/>
                    <StatisticLine text="all" value={all}/>
                    <StatisticLine text="average" value={average()}/>
                    <StatisticLine text="positive" value={positive() + "%"}/>
                </tbody>
            </table>
        )
    } else {
        return (
            <div>
                No feedback given.
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const statistic = {
        good: good,
        neutral: neutral,
        bad: bad,
        average: 0,
        all: 0,
        positive: 0
    }

    const update = (value) => {
        if (value === 'good') {
            setGood(good + 1)
        } else if (value === 'bad') {
            setBad(bad + 1)
        } else {
            setNeutral(neutral + 1)
        }
    }

    return (
        <div>
            <Header text="give feedback"/>
            <Button text="good" onClick={() => update('good')}/>
            <Button text="neutral" onClick={() => update('neutral')}/>
            <Button text="bad" onClick={() => update('bad')}/>
            <Header text="statistics"/>
            <Statistic statistic={statistic}/>
        </div>
    )
}

export default App