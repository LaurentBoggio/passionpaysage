import { Resend } from 'resend';

// Remplacez 're_123...' par votre clé API gratuite sur https://resend.com
const resend = new Resend('re_RfVJLWQd_HSpqyBZ2xMvogprWhRpey5JK');

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Contact Paysagiste <onboarding@resend.dev>',
      to: ['laurentboggio@yahoo.fr'], // Votre adresse qui recevra les devis
      subject: `Nouveau devis de ${name}`,
      html: `
        <h1>Nouveau projet de jardin</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

