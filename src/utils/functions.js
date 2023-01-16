export const currencyFormat = (text) => {
    return 'Rp. ' + text.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}