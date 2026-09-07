import { ApiError, del, extractErrorMessage, get, post, put, request } from './client'

/** POST /user/device-token */
export function storeDeviceToken(body, options) {
  return post('/user/device-token', body, options)
}

/** DELETE /user/device-token */
export function destroyDeviceToken(body, options) {
  return del('/user/device-token', body, options)
}

/** GET /user/homepage */
export function userHomepage(options) {
  return get('/user/homepage', options)
}

/** GET /user/profile */
export function getUserProfile(options) {
  return get('/user/profile', options)
}

/** DELETE /user/delete-profile */
export function deleteUserProfile(options) {
  return del('/user/delete-profile', undefined, options)
}

/** PUT /user/update-profile */
export function updateUserProfile(body, options) {
  return put('/user/update-profile', body, options)
}

/** GET /user/developers */
export function listUserDevelopers(options) {
  return get('/user/developers', options)
}

/** GET /user/compounds/{developer_id} */
export function listUserCompounds(developerId, options) {
  return get(`/user/compounds/${developerId}`, options)
}

/** GET /user/plans-payment-method */
export function listPlansAndPaymentMethods(options) {
  return get('/user/plans-payment-method', options)
}

/** POST /user/make-payment */
export function makeUserPayment(body, options) {
  return post('/user/make-payment', body, options)
}

/** GET /user/contracts */
export function listUserContracts(options) {
  return get('/user/contracts', options)
}

/** GET /user/contract/{id} */
export function showUserContract(id, options) {
  return get(`/user/contract/${id}`, options)
}

/** POST /user/contract/{id}/agree */
export function agreeUserContract(id, options) {
  return post(`/user/contract/${id}/agree`, undefined, options)
}

/** GET /user/contract/{id}/pdf */
export async function downloadUserContractPdf(id, options) {
  const res = await request(`/user/contract/${id}/pdf`, { ...options, raw: true })
  if (!res.ok) {
    const text = await res.text()
    let data = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = { message: text }
    }
    throw new ApiError(extractErrorMessage(data, res.statusText), { status: res.status, body: data })
  }
  return res.blob()
}

/** GET /user/agreed-contracts */
export function listAgreedContracts(options) {
  return get('/user/agreed-contracts', options)
}

/** GET /bot/start */
export function botStart(options) {
  return get('/bot/start', options)
}

/** GET /bot/select/{id} */
export function botSelect(id, options) {
  return get(`/bot/select/${id}`, options)
}

/** POST /user/send-training-request */
export function sendTrainingRequest(body, options) {
  return post('/user/send-training-request', body, options)
}

/** POST /user/send-complaint */
export function sendComplaint(body, options) {
  return post('/user/send-complaint', body, options)
}

/** POST /user/send-deal */
export function sendUserDeal(body, options) {
  return post('/user/send-deal', body, options)
}

/** GET /user/get-developer-ids */
export function getDeveloperIds(options) {
  return get('/user/get-developer-ids', options)
}

/** GET /user/get-compound-ids/{developer_id} */
export function getCompoundIds(developerId, options) {
  return get(`/user/get-compound-ids/${developerId}`, options)
}

/** GET /user/GetCompounds-Commission */
export function getCompoundsCommission(options) {
  return get('/user/GetCompounds-Commission', options)
}

/** POST /user/add-lead */
export function addUserLead(body, options) {
  return post('/user/add-lead', body, options)
}

/** GET /user/brocker-leads */
export function brokerLeads(options) {
  return get('/user/brocker-leads', options)
}

/** GET /user/deals-done */
export function dealsDone(options) {
  return get('/user/deals-done', options)
}

/** GET /user/profit-sales */
export function profitSales(options) {
  return get('/user/profit-sales', options)
}

/** GET /user/favourites */
export function listFavourites(options) {
  return get('/user/favourites', options)
}

/** PUT /user/Unitfavourite/{id} */
export function toggleUnitFavourite(id, favourite, options) {
  return put(`/user/Unitfavourite/${id}`, { favourite }, options)
}

/** PUT /user/Compoundfavourite/{id} */
export function toggleCompoundFavourite(id, favourite, options) {
  return put(`/user/Compoundfavourite/${id}`, { favourite }, options)
}

/** GET /user/uptown-types */
export function listUptownTypes(options) {
  return get('/user/uptown-types', options)
}

/** GET /user/units */
export function listUnits(options) {
  return get('/user/units', options)
}

/** GET /user/buy-units */
export function listBuyUnits(options) {
  return get('/user/buy-units', options)
}

/** GET /user/rent-units */
export function listRentUnits(options) {
  return get('/user/rent-units', options)
}

/** GET /user/compounds-with-commission */
export function listCompoundsWithCommission(options) {
  return get('/user/compounds-with-commission', options)
}

/** GET /user/sell-requests/sub-types/{uptown_type_id} */
export function listSellRequestSubTypes(uptownTypeId, options) {
  return get(`/user/sell-requests/sub-types/${uptownTypeId}`, options)
}

/** GET /user/sell-requests */
export function listSellRequests(options) {
  return get('/user/sell-requests', options)
}

/** POST /user/sell-requests — JSON or FormData */
export function createSellRequest(body, options) {
  return post('/user/sell-requests', body, options)
}

/** GET /user/sell-requests/{id} */
export function showSellRequest(id, options) {
  return get(`/user/sell-requests/${id}`, options)
}

/** PUT /user/unit-sell-request/{id}/delivery-date */
export function updateUnitDeliveryDate(id, body, options) {
  return put(`/user/unit-sell-request/${id}/delivery-date`, body, options)
}

/** GET /user/apartment-installments */
export function listApartmentInstallments(options) {
  return get('/user/apartment-installments', options)
}

/** POST /user/apartment-installments */
export function createApartmentInstallment(body, options) {
  return post('/user/apartment-installments', body, options)
}

/** GET /user/policies */
export function listPolicies(options) {
  return get('/user/policies', options)
}

/** GET /user/policies/{id} */
export function showPolicy(id, options) {
  return get(`/user/policies/${id}`, options)
}
