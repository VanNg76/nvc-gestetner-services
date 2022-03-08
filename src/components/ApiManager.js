export const getCategories = () => {
    return (
        fetch("http://localhost:8088/categories")
                .then(res => res.json())
    )
}

export const getProducts = () => {
    return (
        fetch("http://localhost:8088/products")
                .then(res => res.json())
    )
}

export const getEmployees = () => {
    return (
        fetch("http://localhost:8088/employees")
                .then(res => res.json())
    )
}

export const getCustomers = () => {
    return (
        fetch("http://localhost:8088/customers")
                .then(res => res.json())
    )
}

export const getOrders = () => {
    return (
        fetch("http://localhost:8088/orders")
                .then(res => res.json())
    )
}

export const getServiceTickets = () => {
    return (
        fetch("http://localhost:8088/serviceTickets")
                .then(res => res.json())
    )
}

