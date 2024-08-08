export function sauvegardeItem(nomLocalStorage, itemASauvegarder) { 
    localStorage.setItem(nomLocalStorage, itemASauvegarder  )    
}

export function recuperationItem(Item) {
    return localStorage.getItem(Item)
}

export function suppressionItem(ItemASupprimer) {
    localStorage.removeItem(ItemASupprimer)
}