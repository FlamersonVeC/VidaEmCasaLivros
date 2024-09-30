import BookReturn from "@/lib/componets/book-return";

const { Fragment } = require("react")


const returnBooks = ({params}) => {

    const {id} = params;

    return (
        <Fragment>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <BookReturn bookId={id}/>
            </div>
        </Fragment>
    )
}

export default returnBooks;