import { useState } from 'react'

const NavBar = ({ setFilter }) => {
    const buttons = [
        { id: 1, label: 'Все', filter: 'all' },
        { id: 2, label: 'Активные', filter: 'active' },
        { id: 3, label: 'Завершённые', filter: 'completed' },
    ]

    const [active, setActive] = useState('all')

    const activeButton = (btn) => {
        setFilter(btn.filter)
        setActive(btn.filter)
    }

    return (
        <>
            <div className=" p-2 border-t-1 border-b-1  flex justify-around">
                {buttons.map((button) => {
                    return (
                        <button
                            key={button.id}
                            className={`
                              hover:text-blue-800
                              ${
                                  active === button.filter
                                      ? 'text-gray-900 underline'
                                      : 'text-gray-600'
                              }
                            `}
                            onClick={() => activeButton(button)}
                        >
                            {button.label}
                        </button>
                    )
                })}
            </div>
        </>
    )
}
export default NavBar
