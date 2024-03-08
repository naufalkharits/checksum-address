import keccak from "keccak"

export function isAddress(address: string[]) {
  let wrapper = []
  for (const element of address) {
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(element)) {
      wrapper.push("false")
    } else wrapper.push("true")
  }

  return wrapper
}

export function checksumAddress(address: string[]) {
  const modifiedAddresses = []
  for (const element of address) {
    modifiedAddresses.push(element.toLowerCase().replace("0x", ""))
  }

  const hashes = []
  for (const modifiedAddress of modifiedAddresses) {
    hashes.push(keccak("keccak256").update(modifiedAddress).digest("hex"))
  }

  let newAddress = ""
  let wrapperNewAddress = []
  for (let x = 0; x < modifiedAddresses.length; x++) {
    const modifiedAddress = modifiedAddresses[x]
    const hash = hashes[x]
    newAddress = "0x"
    for (let y = 0; y < modifiedAddress.length; y++) {
      if (parseInt(hash[y], 16) >= 8) {
        newAddress += modifiedAddress[y].toUpperCase()
      } else {
        newAddress += modifiedAddress[y]
      }
    }
    wrapperNewAddress.push(newAddress)
  }

  return wrapperNewAddress
}
