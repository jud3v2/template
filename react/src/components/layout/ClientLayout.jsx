import Header from '../app/Header.jsx';
import Footer from '../app/Footer';

export default function ClientLayout({ Component, props }) {
    return (
        <div>
            <Header />
            <Component {...props} />
            <Footer />
        </div>
    );
};