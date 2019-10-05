class Tool {
    static sleep(timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout)
        })
    }
}

export default Tool