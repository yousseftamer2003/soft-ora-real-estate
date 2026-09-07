import { del, get, post, put } from './client'

/** GET /crm/lookups */
export function crmLookups(options) {
  return get('/crm/lookups', options)
}

/** GET /crm/notifications */
export function crmNotifications(options) {
  return get('/crm/notifications', options)
}

/** POST /crm/notifications/read-all */
export function crmNotificationsReadAll(options) {
  return post('/crm/notifications/read-all', undefined, options)
}

/** POST /crm/notifications/{notification}/read */
export function crmNotificationRead(notification, options) {
  return post(`/crm/notifications/${notification}/read`, undefined, options)
}

/** GET /crm/contacts */
export function crmListContacts(query, options) {
  return get('/crm/contacts', { ...options, query })
}

/** POST /crm/contacts */
export function crmCreateContact(body, options) {
  return post('/crm/contacts', body, options)
}

/** GET /crm/contacts/{contact} */
export function crmShowContact(contact, options) {
  return get(`/crm/contacts/${contact}`, options)
}

/** PUT /crm/contacts/{contact} */
export function crmUpdateContact(contact, body, options) {
  return put(`/crm/contacts/${contact}`, body, options)
}

/** POST /crm/contacts/{contact}/pipeline */
export function crmContactAddToPipeline(contact, options) {
  return post(`/crm/contacts/${contact}/pipeline`, undefined, options)
}

/** POST /crm/contacts/{contact}/activities */
export function crmContactLogActivity(contact, body, options) {
  return post(`/crm/contacts/${contact}/activities`, body, options)
}

/** POST /crm/contacts/{contact}/messages */
export function crmContactSendMessage(contact, body, options) {
  return post(`/crm/contacts/${contact}/messages`, body, options)
}

/** POST /crm/contacts/{contact}/inbound */
export function crmContactLogInbound(contact, body, options) {
  return post(`/crm/contacts/${contact}/inbound`, body, options)
}

/** GET /crm/contacts/{contact}/matches */
export function crmContactMatches(contact, options) {
  return get(`/crm/contacts/${contact}/matches`, options)
}

/** GET /crm/pipeline */
export function crmPipeline(query, options) {
  return get('/crm/pipeline', { ...options, query })
}

/** GET /crm/pipeline/{pipeline} */
export function crmShowPipelineTicket(pipeline, options) {
  return get(`/crm/pipeline/${pipeline}`, options)
}

/** POST /crm/pipeline/{pipeline}/stage */
export function crmUpdatePipelineStage(pipeline, body, options) {
  return post(`/crm/pipeline/${pipeline}/stage`, body, options)
}

/** POST /crm/pipeline/{pipeline}/assign */
export function crmAssignPipeline(pipeline, body, options) {
  return post(`/crm/pipeline/${pipeline}/assign`, body, options)
}

/** POST /crm/pipeline/{pipeline}/unit */
export function crmAttachPipelineUnit(pipeline, body, options) {
  return post(`/crm/pipeline/${pipeline}/unit`, body, options)
}

/** POST /crm/pipeline/{pipeline}/unlock */
export function crmUnlockPipeline(pipeline, options) {
  return post(`/crm/pipeline/${pipeline}/unlock`, undefined, options)
}

/** GET /crm/tasks */
export function crmListTasks(query, options) {
  return get('/crm/tasks', { ...options, query })
}

/** POST /crm/tasks */
export function crmCreateTask(body, options) {
  return post('/crm/tasks', body, options)
}

/** GET /crm/tasks/calendar */
export function crmTaskCalendar(query, options) {
  return get('/crm/tasks/calendar', { ...options, query })
}

/** POST /crm/tasks/{crm_task}/complete */
export function crmCompleteTask(crmTask, options) {
  return post(`/crm/tasks/${crmTask}/complete`, undefined, options)
}

/** GET /crm/deals */
export function crmListDeals(query, options) {
  return get('/crm/deals', { ...options, query })
}

/** POST /crm/deals */
export function crmCreateDeal(body, options) {
  return post('/crm/deals', body, options)
}

/** GET /crm/deals/{deal} */
export function crmShowDeal(deal, options) {
  return get(`/crm/deals/${deal}`, options)
}

/** PUT /crm/deals/{deal} */
export function crmUpdateDeal(deal, body, options) {
  return put(`/crm/deals/${deal}`, body, options)
}

/** POST /crm/deals/{deal}/hold */
export function crmDealHold(deal, body, options) {
  return post(`/crm/deals/${deal}/hold`, body, options)
}

/** POST /crm/deals/{deal}/offers */
export function crmDealOffer(deal, body, options) {
  return post(`/crm/deals/${deal}/offers`, body, options)
}

/** POST /crm/deals/{deal}/offers/{sale_offer}/accept */
export function crmAcceptOffer(deal, saleOffer, options) {
  return post(`/crm/deals/${deal}/offers/${saleOffer}/accept`, undefined, options)
}

/** POST /crm/deals/{deal}/documents */
export function crmIssueDocument(deal, body, options) {
  return post(`/crm/deals/${deal}/documents`, body, options)
}

/** POST /crm/deals/{deal}/payment-plan */
export function crmDealPaymentPlan(deal, body, options) {
  return post(`/crm/deals/${deal}/payment-plan`, body, options)
}

/** POST /crm/deals/{deal}/installments/{buyer_installment}/receipts */
export function crmDealReceipt(deal, buyerInstallment, body, options) {
  return post(`/crm/deals/${deal}/installments/${buyerInstallment}/receipts`, body, options)
}

/** POST /crm/deals/{deal}/handover */
export function crmDealHandover(deal, options) {
  return post(`/crm/deals/${deal}/handover`, undefined, options)
}

/** POST /crm/deals/{deal}/payout */
export function crmDealPayout(deal, body, options) {
  return post(`/crm/deals/${deal}/payout`, body, options)
}

/** GET /crm/inventory */
export function crmListInventory(query, options) {
  return get('/crm/inventory', { ...options, query })
}

/** POST /crm/inventory */
export function crmCreateInventory(body, options) {
  return post('/crm/inventory', body, options)
}

/** GET /crm/inventory/{inventory_unit} */
export function crmShowInventory(inventoryUnit, options) {
  return get(`/crm/inventory/${inventoryUnit}`, options)
}

/** PUT /crm/inventory/{inventory_unit} */
export function crmUpdateInventory(inventoryUnit, body, options) {
  return put(`/crm/inventory/${inventoryUnit}`, body, options)
}

/** POST /crm/inventory/{inventory_unit}/release */
export function crmReleaseInventory(inventoryUnit, options) {
  return post(`/crm/inventory/${inventoryUnit}/release`, undefined, options)
}

/** GET /crm/collections */
export function crmListCollections(query, options) {
  return get('/crm/collections', { ...options, query })
}

/** POST /crm/collections/{buyer_installment}/receipts */
export function crmCollectionReceipt(buyerInstallment, body, options) {
  return post(`/crm/collections/${buyerInstallment}/receipts`, body, options)
}

/** GET /crm/reports */
export function crmReports(options) {
  return get('/crm/reports', options)
}

/** GET /crm/message-templates */
export function crmListTemplates(options) {
  return get('/crm/message-templates', options)
}

/** POST /crm/message-templates */
export function crmCreateTemplate(body, options) {
  return post('/crm/message-templates', body, options)
}

/** GET /crm/message-templates/{message_template} */
export function crmShowTemplate(messageTemplate, options) {
  return get(`/crm/message-templates/${messageTemplate}`, options)
}

/** PUT /crm/message-templates/{message_template} */
export function crmUpdateTemplate(messageTemplate, body, options) {
  return put(`/crm/message-templates/${messageTemplate}`, body, options)
}

/** DELETE /crm/message-templates/{message_template} */
export function crmDeleteTemplate(messageTemplate, options) {
  return del(`/crm/message-templates/${messageTemplate}`, undefined, options)
}

/** GET /crm/broadcasts */
export function crmListBroadcasts(options) {
  return get('/crm/broadcasts', options)
}

/** POST /crm/broadcasts */
export function crmCreateBroadcast(body, options) {
  return post('/crm/broadcasts', body, options)
}

/** GET /crm/broadcasts/{crm_broadcast} */
export function crmShowBroadcast(crmBroadcast, options) {
  return get(`/crm/broadcasts/${crmBroadcast}`, options)
}

/** GET /crm/after-sales */
export function crmListAfterSales(query, options) {
  return get('/crm/after-sales', { ...options, query })
}

/** POST /crm/after-sales */
export function crmCreateAfterSales(body, options) {
  return post('/crm/after-sales', body, options)
}

/** GET /crm/after-sales/{after_sales_ticket} */
export function crmShowAfterSales(afterSalesTicket, options) {
  return get(`/crm/after-sales/${afterSalesTicket}`, options)
}

/** POST /crm/after-sales/{after_sales_ticket}/status */
export function crmUpdateAfterSalesStatus(afterSalesTicket, body, options) {
  return post(`/crm/after-sales/${afterSalesTicket}/status`, body, options)
}

/** GET /crm/agency */
export function crmAgencyWorkspace(query, options) {
  return get('/crm/agency', { ...options, query })
}

/** GET /crm/agency/matching */
export function crmAgencyMatching(query, options) {
  return get('/crm/agency/matching', { ...options, query })
}

/** POST /crm/marketing-agencies/{marketingAgency}/agents */
export function crmCreateAgencyAgent(marketingAgency, body, options) {
  return post(`/crm/marketing-agencies/${marketingAgency}/agents`, body, options)
}

/** GET /crm/developer-portal */
export function crmDeveloperPortal(query, options) {
  return get('/crm/developer-portal', { ...options, query })
}

/** GET /crm/developer-portal/inventory */
export function crmDeveloperInventory(query, options) {
  return get('/crm/developer-portal/inventory', { ...options, query })
}

/** GET /crm/developer-portal/brokers */
export function crmDeveloperBrokers(query, options) {
  return get('/crm/developer-portal/brokers', { ...options, query })
}

/** POST /crm/developer-portal/brokers */
export function crmSyncDeveloperBrokers(body, options) {
  return post('/crm/developer-portal/brokers', body, options)
}

/** POST /crm/developers/{developer}/portal-users */
export function crmCreatePortalUser(developer, body, options) {
  return post(`/crm/developers/${developer}/portal-users`, body, options)
}
