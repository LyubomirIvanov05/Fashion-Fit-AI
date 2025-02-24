import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Assuming your session is stored in locals.session
  if (locals.session && locals.session.user) {
    throw redirect(303, '/private/scan');
  }
  return {};
};
